import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';

const ModalPersonal = (props) => {
  const { setOpen, handleSetOpen } = props;
  function toggleModalFunction() {
    handleSetOpen((prevValue) => !prevValue);
  }

  return (
    <div>
      <div>
        <Modal
          scrollable={!false}
          style={{ maxWidth: '70%', maxHeight: '80%' }}
          isOpen={setOpen}
          toggle={() => {
            toggleModalFunction();
          }}
          centered={!false}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ModalHeader
              style={{
                display: 'inline',
                alignSelf: 'flex-end',
              }}
            >
              All Applications
            </ModalHeader>

            <Button
              onClick={() => {
                toggleModalFunction();
              }}
              outline
              style={{ height: '2rem' }}
              color="danger"
            >
              x
            </Button>
          </div>

          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Application</th>
                  <th>Status</th>
                  <th>Verified</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <Button outline color="info">
                      download
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="danger">Download</Button>{' '}
            <Button color="secondary">Upload</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default ModalPersonal;
