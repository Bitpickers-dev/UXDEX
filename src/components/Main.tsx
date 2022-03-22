import React, { useState } from "react";
import { SendTransaction } from "./Swap";

const style = {
  wrapper: `absolute top-12  bottom-12 w-screen flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
};

const Main = () => {
  const [values, setValues] = useState({
    placeholder: 0,
  });

  function handleInputChange(e: { target: any }) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setValues({ ...values });
  }

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div>Swap</div>
        </div>
        <div className={style.transferPropContainer}>
          <input
            type="text"
            className={style.transferPropInput}
            placeholder="0.0"
            pattern="^[0-9]*[.,]?[0-9]*$"
            // value={values.placeholder}
            onChange={handleInputChange}
          />
          <div className={style.currencySelector}>
            <div className={style.currencySelectorContent}>
              <div className={style.currencySelectorIcon}></div>
              <div className={style.currencySelectorTicker}>USDC→SOL</div>
            </div>
          </div>
        </div>
        {/* <div className={style.transferPropContainer}>
          <input
            type="text"
            className={style.transferPropInput}
            placeholder="0.0"
            onChange={undefined}
            value={values.placeholder}
            // onChange={handleInputChange}
          />
          <div className={style.currencySelector}>
            {" "}
            <div className={style.currencySelectorContent}>
              <div className={style.currencySelectorIcon}></div>
              <div className={style.currencySelectorTicker}>SOL→USDC</div>
            </div>
          </div>
        </div> */}
        <div className={style.confirmButton}>
          <SendTransaction amount={values.placeholder} />
        </div>
      </div>
    </div>
  );
};

export default Main;
