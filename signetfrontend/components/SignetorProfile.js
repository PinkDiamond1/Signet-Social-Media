import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import styles from "../styles/Dashbaord.module.css"
import creatorcontract from "../constants/abi.json"
import Signetorpfp from "./Signetorpfp.js"
import { useToasts } from "react-toast-notifications"
import styles1 from "../styles/Dashbaord.module.css"
import Router from "next/router"
import Link from "next/link"
import stylesprofile from "../styles/profile.module.css"
import { EmojiHappyIcon, SparklesIcon, PhotographIcon, XIcon } from "@heroicons/react/outline"
import {
    usePrepareContractWrite,
    useAccount,
    useConnect,
    useContract,
    useContractRead,
    useContractWrite,
    useNetwork,
    useWaitForTransaction,
} from "wagmi"
export default function Signetprofile(props) {
    const { address } = useAccount()
    const [pfp, setpfp] = useState("")
    const [Name, setName] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [ready, setready] = useState(false)
    const [gene, setgene] = useState(false)
    const [uploadFile, setuploadFile] = useState("")
    const { addToast } = useToasts()
    const filePickerRef = useRef(null)
    const { data: nameinfo } = useContractRead({
        addressOrName: creatorcontract.address,
        contractInterface: creatorcontract.abi,
        chains: 5,
        functionName: "checkName",
        watch: true,
        args: props.address,
    })
    const { data: pfpinfo } = useContractRead({
        addressOrName: creatorcontract.address,
        contractInterface: creatorcontract.abi,
        chains: 5,
        functionName: "checkPfp",
        watch: true,
        args: props.address,
    })
    useEffect(() => {
        if (
            nameinfo ==
            "You seeing this message is becuase this address don't have any name created!"
        ) {
            setName("Unname")
        } else {
            setName(nameinfo)
        }
    }, [nameinfo])
    useEffect(() => {
        if (
            pfpinfo ==
            "You seeing this message is becuase this address don't have any pfp created!"
        ) {
            setpfp(
                "https://banner2.cleanpng.com/20180401/dbq/kisspng-user-profile-computer-icons-profile-5ac09245049c32.0935523415225697970189.jpg"
            )
        } else {
            setpfp(pfpinfo)
        }
    }, [pfpinfo])

    return (
        <div>
            <Link href={"/" + props.address}>
                <button>
                    <div className="rounded-sm flex flex-row space-x-3">
                        <img src={pfp} className="rounded-full" width="30" height="30" />
                        <div className="">{Name}</div>
                    </div>
                </button>
            </Link>
        </div>
    )
}
