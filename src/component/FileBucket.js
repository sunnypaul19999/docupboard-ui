import axios from "axios";
import produce from "immer";
import { useMemo, useState } from "react"

import FileView from "./FileView";

export default function FileBucket() {

    const [filesRecords, setFileRecords] = useState({});

    const fetchFileRecords = async () => {
        try {

            const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/user/file/all', {
                withCredentials: true
            });
            const records = res.data;
            const prepareDraft = (draft) => {
                records.forEach(record => {
                    if (!filesRecords[record.file_name]) {
                        draft[record.file_storage_name] = record;
                    }
                });
                console.log(draft);
            }

            prepareDraft({});

            setFileRecords(produce(prepareDraft));
        } catch (err) {
            console.error(err);
        }
    }

    useMemo(fetchFileRecords, []);

    const getFileViews = () => {
        if (Object.keys(filesRecords).length == 0) return (<></>);
        else {
            const fileViews = [];
            console.log(Object.keys(filesRecords));
            Object.keys(filesRecords)
                .forEach(fileStorageName => {
                    fileViews.push(
                        <FileView
                            key={fileStorageName}
                            fileStorageName={fileStorageName}
                            originalFilename={filesRecords[fileStorageName].file_name} />
                    );
                });
            return fileViews;
        }
    }

    return (
        <div className="file-bucket">
            {getFileViews()}
            <span className="file-view-dummy"></span>
            <span className="file-view-dummy"></span>
            <span className="file-view-dummy"></span>
            <span className="file-view-dummy"></span>
            <span className="file-view-dummy"></span>
        </div>
    );
}