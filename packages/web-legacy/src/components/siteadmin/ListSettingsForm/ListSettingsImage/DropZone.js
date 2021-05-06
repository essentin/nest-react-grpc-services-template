import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import DropzoneComponent from 'react-dropzone-component';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import { doUploadTempPhoto, startPhotoLoader, stopPhotoLoader } from '../../../../actions/siteadmin/IconUploadLoader/manageSutiable';
import { maxUploadSize } from '../../../../config';
import { toastr } from 'react-redux-toastr';

class Dropzone extends Component {

    static propTypes = {
        doUploadTempPhoto: PropTypes.func.isRequired,
        formatMessage: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    componentDidUpdate() {
        const isBrowser = typeof window !== 'undefined';
        const isDocument = typeof document !== undefined;
        if (isBrowser && isDocument) {
            document.querySelector(".dz-hidden-input").style.visibility = 'visible';
            document.querySelector(".dz-hidden-input").style.opacity = '0';
            document.querySelector(".dz-hidden-input").style.height = '100%';
            document.querySelector(".dz-hidden-input").style.width = '100%';
            document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
        }
    }

    async success(file, fromServer) {
        const { doUploadTempPhoto, change, formName } = this.props;
        const { thumbnail, id, typeId } = this.props;
        let fileName = fromServer.file.filename;
        ///let oldPicture = thumbnail != undefined ? thumbnail : null;
        let sutiableId = id != undefined ? id : null;
        await change(formName, 'thumbnail', fileName)
        if (formName === 'EditListSettingsForm') {
            await doUploadTempPhoto(fileName, sutiableId);
        }
    }

    addedfile(file, fromServer) {
        const { startPhotoLoader, stopPhotoLoader } = this.props;
        if (file.size > (1024 * 1024 * maxUploadSize)) {
            toastr.error('Maximum upload size Exceeded! ', 'Try with smallest size image');
            this.dropzone.removeFile(file.name);
            this.dropzone.removeFile(file);
            stopPhotoLoader();
        }
        else {
            startPhotoLoader();
        }
        setTimeout(() => {
            if (file && file.accepted === false) {
                toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
                this.dropzone.removeFile(file.name);
                this.dropzone.removeFile(file);
                stopPhotoLoader();
            }
            if (file && file.accepted === true) {
                stopPhotoLoader();
            }
        }, 1000)
    }

    render() {
        const { defaultMessage } = this.props;

        const djsConfig = {
            dictDefaultMessage: '',
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            maxFiles: 1,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false,
            hiddenInputContainer: '.dzInputContainer'
        };

        const componentConfig = {
            iconFiletypes: ['.png'],
            postUrl: '/uploadIconListSettingsPhoto'
        };

        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <div className={cx('dzInputContainer')}>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                >
                    {defaultMessage}
                </DropzoneComponent>
            </div>
        );
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    doUploadTempPhoto,
    change,
    stopPhotoLoader,
    startPhotoLoader
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
