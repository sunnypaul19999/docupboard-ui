import axios from "axios";
import produce from "immer";
import { useEffect, useMemo, useRef, useState } from "react"

import FileView from "./FileView";

export default function FileBucket() {

    const [filesRecords, setFileRecords] = useState({});

    const isMounted = useRef(false);
    const fetchFileRecordTimeouts = useRef([]);

    const fetchFileRecords = async () => {
        //clear timeouts
        while (fetchFileRecordTimeouts.current.length > 0) {
            // console.log(fetchFileRecordTimeouts.current.length);
            clearTimeout(fetchFileRecordTimeouts.current.pop());
        }
        if (isMounted.current && fetchFileRecordTimeouts.current.length == 0) {
            try {
                const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/user/file/all', {
                    withCredentials: true
                });
                const records = res.data;
                // console.log(records);
                const prepareDraft = (draft) => {
                    records.forEach(record => {
                        if (!filesRecords[record.file_record_id]) {
                            draft[record.file_record_id] = record;
                        }
                    });
                }

                setFileRecords(produce(prepareDraft));

            } catch (err) {
                console.error(err, 'failed to load user upload from server');
            } finally {
                // refresh function
                const refreshFileRecordTimeoutId = setTimeout(fetchFileRecords, 2000);
                fetchFileRecordTimeouts.current.push(refreshFileRecordTimeoutId);
            }

        }
    }

    // useMemo(() => {

    //     fetchFileRecords();
    // }, []);

    useEffect(() => {
        isMounted.current = true;
        fetchFileRecords();
        return () => {
            isMounted.current = false;
        }
    }, []);

    const getFileViews = () => {
        if (Object.keys(filesRecords).length == 0) return (<></>);
        else {
            const fileViews = [];
            // console.log(Object.keys(filesRecords));
            Object.keys(filesRecords)
                .forEach(fileRecordId => {
                    fileViews.push(
                        <FileView
                            key={fileRecordId}
                            fileRecordId={fileRecordId}
                            originalFilename={filesRecords[fileRecordId].file_name} />
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