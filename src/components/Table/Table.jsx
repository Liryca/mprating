import React, { useEffect, useRef } from "react";
import "./Table.scss";
import stop from "./images/Stop.svg";
import start from "./images/Start.svg";
import arrow from "./images/up-arrow-button.png";
import { backTop } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { actionMode, } from "../../store/client/action";
import { getProductsThunk } from "../../store/products/action";
import { TailSpin } from "react-loader-spinner";
import DataTable from "../DataTable/DataTable";
import { getNotificationsAcyncAction } from "../../store/notifications/action";

const Table = () => {
    const dispatch = useDispatch();
    const clientInfo = useSelector((state) => state.clientInfo);
    const pagination = useSelector((state) => state.pagination);
    const products = useSelector((state) => state.products);
    const { user, modeType } = clientInfo;
    const { page } = pagination;
    const upbuttonRef = useRef(null);

    
    useEffect(() => {
        dispatch(getProductsThunk());
    }, [page])

    // useEffect(() => {
    //     window.onscroll = function () {
    //         const scrolled = window.scrollY;
    //         if (upbuttonRef.current !== null) {
    //             scrolled > 100
    //                 ? (upbuttonRef.current.style.display = "block")
    //                 : (upbuttonRef.current.style.display = "none");
    //         }
    //     };
    // }, []);

    function changeStateMode(mode) {
        dispatch(actionMode(mode));
    }




    if (products.isLoadingProducts || clientInfo.isLoading) {
        return (
            <TailSpin
                height="140"
                width="140"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{ background: "ffffff" }}
                wrapperClass="tail-spin-loading"
                visible={true}
                color="#E5E7EB"
            />
        );
    }

    if (products.error) {
        return <div>{products.error}</div>;
    }

    return (
        <div className="table">
            <div className="table__buttons">
                <button
                    onClick={() => changeStateMode('AUTO')}
                    className={modeType === 'AUTO' ? "table__button-active main-font " : "table__button main-font"}
                    type="button">
                    <img
                        className="table__button-icon"
                        src={user.activeMode ? start : stop}
                        alt="circle">
                    </img>
                    Автомат
                </button>
                <button
                    onClick={() => changeStateMode('SEMI_AUTO')}
                    className={modeType === 'SEMI_AUTO' ? "table__button-active main-font" : "table__button main-font"}
                    type="button" >
                    Полуавтомат
                </button>
            </div>
            {/* <table className="table__tbl"> */}
            <DataTable/>
                {/* <Thead />
                <Tbody /> */}
            {/* </table> */}
          
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
