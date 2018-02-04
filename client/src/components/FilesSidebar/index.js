import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { File } from '../../types'

const styles = StyleSheet.create({
    fileSidebar: {
        paddingRight: '2rem',
    },
});

type Props = {
    files: File[]
}

class FilesSidebar extends React.Component {
    props: Props

    render() {
        const files = this.props.files;
        return (
            <div className={css(styles.fileSidebar)}>
                {files.map(function(file) {
                        return (
                            <button key={file.id}>
                                {file.id}
                            </button>
                        )
                    })
                }
            </div>
        );
    };

}

export default FilesSidebar;