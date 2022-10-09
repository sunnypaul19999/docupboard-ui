import axios from 'axios';
import { useRef } from 'react';
import file from '../assets/image/file.svg';
export default function FileView(props) {

    const fileAction = useRef({
        downloadTriggered: false,
        downloadSuccess: false,
    });

    const downloadFile = async (event) => {
        event.stopPropagtion();
        try {
            fileAction.current.downloadTriggered = true;
            const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/user/file/${props.fileStorageName}`);
            fileAction.current.downloadSuccess = true;
        } catch (err) {
            console.error(err);
            fileAction.current.downloadSuccess = false;
        }
    }

    return (
        <span className="file-view" onClick={downloadFile}>
            <div className="file-icon">
                <img src={file} />
            </div>
            <div className="dwnld-icon-container">
                <span className="dwnld-icon material-symbols-outlined">
                    download
                </span>
            </div>
            <span className="file-name-text">{props.originalFilename}</span>
        </span>
    );
}