import axios from 'axios';
import file from '../assets/image/file.svg';

export default function FileView(props) {

    const downloadFile = async (event) => {
        event.stopPropagtion();
        try {
            await axios.get(process.env.REACT_APP_SERVER_URL + `/user/file/${props.fileRecordId}`);
        } catch (err) {
            console.error(err);
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