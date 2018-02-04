import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { File } from '../../types'

const styles = StyleSheet.create({
    fileSidebar: {
        paddingRight: '5rem',
    },

    header: {
        marginLeft: '5rem',
        marginBottom: '10px',
    },
});

type Props = {
    files: File[],
    getFileHandler: () => void
}

class FilesSidebar extends React.Component {
    props: Props



    render() {
        const files = this.props.files;
        const fileHandler = this.props.getFileHandler;

        return (
            <div className={css(styles.fileSidebar)}>
                <div>
                    <h3 className={css(styles.header)}>Resources</h3>
                    {files.map(function(file) {
                            return (
                                <button className="btn btn-lg" key={file.id} onClick={fileHandler(file.id)}>
                                    <span className="fa fa-file">
                                        <div> {file.id} </div>
                                    </span>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        );
    };

}

export default FilesSidebar;