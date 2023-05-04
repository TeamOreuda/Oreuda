import { useState } from "react";
import st from "./moveFolder.module.scss";

export default function MoveFolder() {
  const options = [
    { id: 1, value: "hello" },
    { id: 2, value: "111" },
    { id: 3, value: "2222" },
    { id: 1, value: "hello" },
    { id: 2, value: "111" },
    { id: 3, value: "2222" },
    { id: 1, value: "hello" },
    { id: 2, value: "111" },
    { id: 3, value: "2222" },
    { id: 1, value: "hello" },
    { id: 2, value: "111" },
    { id: 3, value: "2222" },
    { id: 1, value: "hello" },
    { id: 2, value: "111" },
    { id: 3, value: "2222" },
    { id: 1, value: "hello" },
    { id: 2, value: "111" },
    { id: 3, value: "2222" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(!isOpen);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className={st.dropdown} onClick={toggleDropdown}>
        {selectedOption.value}
      </div>
      <div className={st.dropdown}>
        {isOpen && (
          <div className={st.options}>
            {options.map((option) => (
              <div
                key={option.id}
                className={`${st.option} ${option.value === selectedOption.value ? st.active : ""}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
