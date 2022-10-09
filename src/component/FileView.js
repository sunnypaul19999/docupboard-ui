import axios from 'axios';
import file from '../assets/image/file.svg';

export default function FileView(props) {

    const downloadFile = async (event) => {
        event.stopPropagation();
        const url = process.env.REACT_APP_SERVER_URL + `/user/file/download/${props.fileRecordId}`;
        const fileLinkElement = document.createElement('a');
        fileLinkElement.href = url;
        fileLinkElement.click();
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