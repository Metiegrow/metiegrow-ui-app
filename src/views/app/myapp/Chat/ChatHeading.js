// import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import React from 'react';

const ChatHeading = ({ name, thumb, lastSeenDate }) => {
  return (
    <>
      <div className="d-flex flex-row chat-heading">
        <div className="d-flex">
          <img
            alt={name}
            src={thumb}
            // className="img-thumbnail border-0 rounded-circle ml-0 mr-4 list-thumbnail align-self-center small"
            className=" rounded-circle img-thumbnail border mr-4 mb-1"
            style={{ width: "70px", height: "70px", objectFit: "cover", overflow: "hidden"  }}
          />
          {/* <ThumbnailLetters
          small
                  rounded
                  text={thumb}
                  className="m-2"
                /> */}
        </div>
        <div className=" d-flex min-width-zero">
          <div className="card-body pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
            <div className="min-width-zero">
              <div>
                <p className="list-item-heading mb-1 truncate ">{name}</p>
              </div>
              <p className="mb-0 text-muted text-small">
                {lastSeenDate === '0' ? '-' : lastSeenDate}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="separator mb-5" />
    </>
  );
};

export default React.memo(ChatHeading);
