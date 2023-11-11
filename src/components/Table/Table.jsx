import React, { useEffect, useRef } from "react";
import "./Table.scss";
import stop from "./images/Stop.svg";
import start from "./images/Start.svg";
import arrow from "./images/up-arrow-button.png";
import Thead from "../Thead/Thead";
import Tbody from "../Tbody/Tbody";
import { backTop } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { actionStatusMode, changeModeAcyncAction, } from "../../store/mode/action";
import { getProductsThunk } from "../../store/products/action";
import PaginationControlled from "../PaginationController/PaginationController";
import { TailSpin } from "react-loader-spinner";

const Table = () => {
    const dispatch = useDispatch();
    const activeMode = useSelector((state) => state.activeMode);
    const pagination = useSelector((state) => state.pagination);
    const { status, mode } = activeMode;
    const { page} = pagination;
    const upbuttonRef = useRef(null);


    useEffect(() => {
        window.onscroll = function () {
            const scrolled = window.pageYOffset;
            if (upbuttonRef.current !== null) {
                scrolled > 100
                    ? (upbuttonRef.current.style.display = "block")
                    : (upbuttonRef.current.style.display = "none");
            }
        };
    }, []);

    function changeStateMode(str) {
        dispatch(changeModeAcyncAction(str));
        if (activeMode === "semi-automat") {
            dispatch(actionStatusMode(""));
        }
    }

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [page])



    // if (products.isLoadingProducts) {
    //     return (
    //         <TailSpin
    //             height="140"
    //             width="140"
    //             ariaLabel="tail-spin-loading"
    //             radius="1"
    //             wrapperStyle={{ background: "ffffff" }}
    //             wrapperClass="tail-spin-loading"
    //             visible={true}
    //             color="#E5E7EB"
    //         />
    //     );
    // }

    // if (products.error) {
    //     return <div>{products.error}</div>;
    // }

    return (
        <div className="table">
            <div className="table__buttons">
                <button
                    onClick={() => changeStateMode("automat")}
                    className={mode === "automat" ? "table__button-active main-font " : "table__button main-font"}
                    type="button">
                    <img
                        className="table__button-icon"
                        src={status ? start : stop}
                        alt="circle"
                    ></img>
                    Автомат
                </button>
                <button
                    onClick={() => changeStateMode("semi-automat")}
                    className={mode === "semi-automat" ? "table__button-active main-font" : "table__button main-font"}
                    type="button" >
                    Полуавтомат
                </button>
            </div>
            <table className="table__tbl">
                <Thead />
                <Tbody />
            </table>
            {/* <PaginationControlled /> */}
            {<div className="table__container-arrow">
                <img
                    ref={upbuttonRef}
                    onClick={backTop}
                    className="table__up-button"
                    src={arrow}
                    alt="arrow"
                ></img>
            </div>
            }
        </div>
    );
};

export default Table;
