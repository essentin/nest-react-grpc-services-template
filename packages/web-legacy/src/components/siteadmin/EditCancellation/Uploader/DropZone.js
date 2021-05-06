import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

import { connect } from 'react-redux';
import { change } from 'redux-form';
import { startCancellationLoader, doUploadCancellation, endCancellationLoader } from '../../../../actions/siteadmin/manageCancellation';
import { toastr } from 'react-redux-toastr';
import { maxUploadSize } from '../../../../config';

class Dropzone extends Component {

    static propTypes = {
        doUploadCancellation: PropTypes.any.isRequired,
        startCancellationLoader: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: null,
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    async success(file, fromServer) {
        const { doUploadCancellation, data, change } = this.props;
        let fileName = fromServer.file.filename;
        let oldPicture = data.image != null ? data.image : null;
        let filePath = fromServer.file.path;
        let image = fileName;
        doUploadCancellation(image, filePath, oldPicture, data.id);
        await change('EditCancellationForm', 'image', fileName);
    }

    addedfile(file, fromServer) {
        const { startCancellationLoader, endCancellationLoader } = this.props;
        if (file.size > (1024 * 1024 * maxUploadSize)) {
            toastr.error('Maximum upload size Exceeded! ', 'Try with smallest size image');
            this.dropzone.removeFile(file);
            endCancellationLoader();
        }
        else {
            startCancellationLoader();
        }
        setTimeout(() => {
            if (file && file.accepted === false) {
                toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
                this.dropzone.removeFile(file.name);
                this.dropzone.removeFile(file);
                endCancellationLoader();
            }
            if (file && file.accepted === true) {
                endCancellationLoader();
            }
        }, 1000)
    }

    render() {
        const djsConfig = {
            dictDefaultMessage: 'Click Here to Upload Image',
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadCancellation'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <div>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                />
            </div>
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    doUploadCancellation,
    startCancellationLoader,
    endCancellationLoader,
    change
};

export default withStyles(s)(connect(mapState, mapDispatch)(Dropzone));
