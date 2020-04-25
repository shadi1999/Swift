import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Button, Upload, message } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { usePdf } from '@mikecousins/react-pdf';
import { uploadSlides, changeSlidesPage } from '../../actions/lecture';
import config from '../../Config';

const Slides = ({user, slideUrl, uploadSlides, token, changeSlidesPage, page}) => {
    // TODO: Get the page when the lecture loads.
    // const [page, setPage] = useState(1);
    const canvasRef = useRef(null);
    const { id } = useParams();
  
    const { pdfDocument, pdfPage } = usePdf({
      file: `${config.URL.Server}/${slideUrl}`,
      page,
      canvasRef
    });

    const props = {
        name: 'file',
        action: `${config.URL.Server}/api/files/upload/${id}`,
        headers: {
            "x-auth-token": token
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                // Send the slides file name to the student when the upload is done.
                let lectureId = /([^\/]+$)/.exec(info.file.response.destination)[0];
                let url = `files/${id}/${lectureId}/${info.file.response.filename}`;
                uploadSlides(url);
                message.success(`${info.file.name} file has been uploaded successfully.`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };

    const next = () => {
        changeSlidesPage(page + 1);
    }
    const prev = () => {
        changeSlidesPage(page - 1);
    }

    return (
    <div>
        {(!pdfDocument && user.kind === "Tutor") && (
            <Upload.Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag the slides to this area to upload</p>
                <p className="ant-upload-hint">
                    Please, upload a pptx, ppt or PDF file.
                </p>
            </Upload.Dragger>
          )}
        <canvas className="slides-canvas" ref={canvasRef} />
        {Boolean(pdfDocument && pdfDocument.numPages) && (
            <nav>
                <ul className="pager">
                    <li className="previous">
                        <Button shape="circle" disabled={page === 1} onClick={prev} icon={<LeftCircleOutlined />} />
                    </li>
                    {`${page}/${pdfDocument.numPages}`}
                    <li className="next">
                        <Button
                            shape="circle"
                            disabled={page === pdfDocument.numPages}
                            onClick={next}
                            icon={<RightCircleOutlined />} />
                    </li>
                </ul>
            </nav>
        )}
    </div>
    )
}

Slides.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    slideUrl: state.lecture.slideUrl,
    page: state.lecture.slidePage,
    token: state.auth.token
});

export default connect(mapStateToProps, { uploadSlides, changeSlidesPage })(Slides);