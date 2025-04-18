/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';
import { baseUrl } from 'constants/defaultValues';

const ReactDOMServer = require('react-dom/server');

// const dropzoneComponentConfig = {
//   // postUrl: 'https://httpbin.org/post',
//   postUrl: `${baseUrl}/api/lawyer/job/19/document/1`,
 
// };
function getTokenRes() {
  return localStorage.getItem('tokenRes');
}
const token = getTokenRes();

const dropzoneConfig = {
  thumbnailHeight: 160,
  maxFilesize: 2,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              <i />{' '}
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container">
            {/*  eslint-disable-next-line jsx-a11y/alt-text */}
            <img data-dz-thumbnail className="img-thumbnail border-0" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            {' '}
            <span data-dz-name />{' '}
          </div>
          <div className="text-primary text-extra-small" data-dz-size />
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
      <a href="#/" className="remove" data-dz-remove>
        {' '}
        <i className="glyph-icon simple-icon-trash" />{' '}
      </a>
    </div>
  ),
  headers: {'Authorization': `Bearer ${token}`},
};

export default class DropzoneExample extends Component {
 

  

  clear() {
    this.myDropzone.removeAllFiles(true);
  }

  
  render() {
    const { jobId,stepNo } = this.props;
    const dropzoneComponentConfig = {
      // postUrl: 'https://httpbin.org/post',
      postUrl: `${baseUrl}/api/lawyer/job/${jobId}/document/${stepNo}`,
      
     
    };
    return (
      <DropzoneComponent
        config={dropzoneComponentConfig}
        djsConfig={dropzoneConfig}
        eventHandlers={{
          init: (dropzone) => {
            this.myDropzone = dropzone;
          },
          success: (response) => {
            console.log("document upload sucesss",response);
            if (response.status === "success") {
              window.location.reload();
            }
          },
        }}
      />
    );
  }
}
