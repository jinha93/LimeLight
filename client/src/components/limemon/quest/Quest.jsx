import { useState } from "react"
import axios from 'axios';

import { FaCheckCircle } from "react-icons/fa"
import InputText from "./InputText";
import Button from "../common/Button";

export default function Quest({ quest, getQuestList, getLimemonList, setIsAlert, setIsResultAlert, setResultAlertData }){

    // Loader
    const [showLoader, setShowLoader] = useState(false)

    // Input Text
    const [isInputText, setIsInputText] = useState(false);
    const [questId, setQuestId] = useState('');
    const fnInputTextSetting = (questId) => {
        setQuestId(questId);
        setIsInputText(true);
    }
    const fnClose = () => {
        setIsInputText(false);
    }

    // 퀘스트 클레임
    const cliam = (questId, inputText) => {
        setShowLoader(true)

        axios({
            url: '/api/quest/claim',
            method: 'POST',
            data: {
                questId: questId,
                inputText: inputText
            }
        }).then((response) => {
            setTimeout(() => {
                setShowLoader(false)
                if(response.data.success){
                    getQuestList();
                    getLimemonList();
                    fnClose();
                }
            }, 1000)
        }).catch((error) => {
            setTimeout(() => {
                setShowLoader(false)
                // 로그인 세션 에러
                if(error.response.status === 401){
                    // alert 활성화
                    setIsAlert(true);
                }else{
                    setResultAlertData({ type: 'danger', title: 'Claim Failed', text: error.response.data.message})
                    setIsResultAlert(true);
                    setTimeout(() => {
                        setIsResultAlert(false);
                    }, 3000)
                }
            }, 1000)
        })
    }

    return (
        <>
            {/* 텍스트 입력 */}
            {isInputText ? <InputText cliam={cliam} fnClose={fnClose} questId={questId} showLoader={showLoader}/> : null}
            
            <div className="border-2 border-gray-900 rounded-lg px-5 py-5 flex items-center gap-5 bg-white shadow-md mr-2.5 h-24 mb-3">
                <div className="w-1/6">{quest.recurrence}</div>
                <div className="w-3/6 flex flex-col">
                    <span className="text-lg">{quest.name}</span>
                    <span className="text-xs mt-1">{quest.content}</span>
                </div>
                <div className="w-1/6">
                    {quest.Rewards.map((reward, i) => {
                        return(
                            <div key={i}>
                                <span>{reward.type} x {reward.value}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="w-1/6 text-center">
                    {quest.QuestStatus == null || !quest.QuestStatus.status
                    ?
                        <Button
                            onSubmit={() => quest.Submission.type === 'TEXT' ? fnInputTextSetting(`${quest.questId}`) : cliam(`${quest.questId}`)}
                            text={'Claim'}
                            loading={showLoader}
                            disabled={showLoader}
                        />
                    :
                        <FaCheckCircle size={30} className="inline-block"/>
                    }
                    
                </div>
            </div>
        </>
    )
}