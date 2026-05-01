import { useId } from "react";

type dataToShow = {
    label: string;
    val: string;
}



export default function MyTextToShow({label, val}:dataToShow) {
  const id = useId();

  return (
    <div>
        <div className="flex d-flex align-items-center gap-3">
            <label htmlFor={id}>{label} <span>:</span></label>
            <span id={id} className="fw-semibold">{val}</span>
        </div>
    </div>
  )
}
