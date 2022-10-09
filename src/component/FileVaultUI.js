import FileVaultToolbar from './FileVaultToolbar';
import FileBucket from './FileBucket';

export default function FileVaultUI() {

    return (
        <div className="file-vault">
            <FileVaultToolbar />
            <FileBucket />
        </div>
    )
}