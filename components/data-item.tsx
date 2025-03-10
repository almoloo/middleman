import {QAObject} from "@/lib/definitions";

export default function DataItem({data}: {data: QAObject}) {
    return (
        <div>
            {data.question}:
            {data.answer}
        </div>
    )
}