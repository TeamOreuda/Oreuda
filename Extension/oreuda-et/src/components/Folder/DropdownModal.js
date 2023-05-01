import st from "./DropdownList.module.scss";

const DropdownModal = ({list}) => {
    list.map((key) =>{
        console.log(key.name)
    })
    return(
        <div>
            {list.map((key)=>{
                <div>{key.name} 12</div>
            })}
        </div>
    )
}

export default DropdownModal;