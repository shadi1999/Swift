import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Result, Button, List, Avatar, Radio, Tooltip, Menu, Dropdown } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { usePdf } from '@mikecousins/react-pdf';

const Slides = () => {
    const [page, setPage] = useState(1);
    const canvasRef = useRef(null);
  
    const { pdfDocument, pdfPage } = usePdf({
      file: 'TM355_Session_1.pdf',
      page,
      canvasRef
    });

    return (
    <div>
        {!pdfDocument && <span>Loading...</span>}
        <canvas className="slides-canvas" ref={canvasRef} />
        {Boolean(pdfDocument && pdfDocument.numPages) && (
            <nav>
                <ul className="pager">
                    <li className="previous">
                        <Button shape="circle" disabled={page === 1} onClick={() => setPage(page - 1)} icon={<LeftCircleOutlined />} />
                    </li>
                    {`${page}/${pdfDocument.numPages}`}
                    <li className="next">
                        <Button
                            shape="circle"
                            disabled={page === pdfDocument.numPages}
                            onClick={() => setPage(page + 1)}
                            icon={<RightCircleOutlined />} />
                    </li>
                </ul>
            </nav>
        )}
    </div>
    )
}

Slides.propTypes = {
}

const mapStateToProps = (state) => ({
});

export default Slides;