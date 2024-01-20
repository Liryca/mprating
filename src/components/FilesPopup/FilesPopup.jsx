import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './FilesPopup.scss';
import cross from './images/Ic_cross.svg'
import moment from "moment/moment";
import Button from "../Button/Button";
import { FileUploader } from "react-drag-drop-files";
import InputFileUpload from "../ButtonUpload/ButtonUpload";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { changePopupFilesState } from "../../store/FilesPopup/action";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
import { deleteFileAxios, downloadFileAxios, getFilesAxios, uploadFileAxios } from "../../api/services/files";
import { createExcel } from "../../utils/createExcel";

const FilesPopup = () => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState();
    const { active } = useSelector(state => state.popupFiles);
    const [isLoad, setIsload] = useState(false);
    const [file, setFile] = useState(null);
    const [date, setDate] = useState([]);
    const [errorFile, setErrorFile] = useState(null);
    const fileTypes = ['XLSX'];

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape' && active) {
                closePopup()
            }
        }
        document.addEventListener('keydown', keyDownHandler);
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, [active]);

    useEffect(() => {
        if (active) {
            getFolderFiles();
        }
    }, [active]);


    async function getFolderFiles() {
        try {
            const response = await getFilesAxios();
            console.log(response.data)
            setFiles(response.data)
        } catch (e) {
            console.log(e)
        }
    }


    function handleChangeFile(file) {
        setFile(file)
    };

    function handleChangeDate(value) {
        setDate(value)
    }

    function closePopup() {
        dispatch(changePopupFilesState(false));
        setFile(null);
        setDate([]);
    }

    function cancelChanged() {
        setFile(null);
        setDate([]);
    }

    async function uploadFile() {
        try {
            if (file && date.length >= 2) {
                const startDay = moment(date[0].$d).format().split('T')[0]
                const endDay = moment(date[1].$d).format().split('T')[0]
                const formdata = new FormData();
                formdata.append("file", file,);
                formdata.append("startDate", startDay);
                formdata.append("endDate", endDay)
                await uploadFileAxios(formdata)
                    .then(() => {
                        getFolderFiles();
                        setErrorFile(null);
                    })
            }

        } catch (e) {
            console.log(e.response.data.message)
            setErrorFile(e.response.data.message)
        } finally {
            setFile(null);
            setDate([]);
        }
    }


    async function deliteFile(id) {
        try {
            await deleteFileAxios(id).then(() => getFolderFiles())
        } catch (e) {
            console.log(e);
        }
    }

    async function downloudFile(id, name) {
        try {
            await downloadFileAxios(id).then((response) => {
                createExcel(response.data, name)
            })

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className={active ? 'filesPopup filesActive'
            : 'filesPopup'}>
            <div className="filesPopup__main">
                <div className="filesPopup__contain">
                    <div className="filesPopup__wrapper">
                        <FileUploader
                            classes={errorFile?'filesPopup__filesUploader filesPopup__filesUploaderError':'filesPopup__filesUploader'}
                            children={
                                <div className="filesPopup__content">
                                    <p className="small-font"> Загрузите или перетащите файл</p>
                                    <InputFileUpload />
                                </div>
                            }
                            handleChange={handleChangeFile}
                            name="file" types={fileTypes} />
                        {errorFile && <p className="small-font small-fontError filesPopup__error">{errorFile}</p>}
                        {file &&
                            <div className="filesPopup__addedFile">
                                <div className="filesPopup__addedFile-title">
                                    <p style={{ wordBreak: 'break-word' }} className="notice grey">{file.name}</p>
                                    <div className="filesPopup__icon-upload"><FileUploadRoundedIcon style={{ color: '#808080' }} onClick={uploadFile} /></div>
                                    <div className="filesPopup__icon-clear" > <ClearOutlinedIcon style={{ color: '#808080' }} onClick={cancelChanged} /></div>
                                </div>
                                <div className="filesPopup__List-secondItem">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MultiInputDateRangeField
                                            onChange={(newValue) => handleChangeDate(newValue)}
                                            format="DD-MM-YYYY"
                                            slotProps={{
                                                textField: ({ position }) => ({
                                                    label: position === 'start' ? 'Начало акции' : 'Окончание акции',
                                                    size: 'small',
                                                }),
                                            }}
                                        />

                                    </LocalizationProvider>
                                </div>
                            </div>
                        }

                        <div className="filesPopup__List">
                            {files?.length !== 0 && files?.map((elem, index) => {
                                return <div key={index} className="filesPopup__List-item">
                                    <div className="filesPopup__List-firstItem">
                                        <InsertDriveFileOutlinedIcon style={{ color: '#808080' }} />
                                        <p className="notice grey">{elem.fileName}</p>
                                        <div className="filesPopup__icon-downloud">
                                            <FileDownloadOutlinedIcon
                                                onClick={() => downloudFile(elem.id, elem.fileName)}
                                                style={{ color: '#808080' }} />
                                        </div>
                                        <div className="filesPopup__clear-icon">
                                            <ClearOutlinedIcon
                                                onClick={() => deliteFile(elem.id)}
                                                style={{ color: '#808080' }} />
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>

                    </div>
                    <img className="filesPopup__closeIcon" onClick={() => closePopup()} src={cross} alt="cross"></img>
                </div>
            </div>


        </div>
    );
};

export default FilesPopup;