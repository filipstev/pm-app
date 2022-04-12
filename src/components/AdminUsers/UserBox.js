import React, { useCallback, useEffect, useState } from 'react';
import './UserBox.scss';
import Default from '../../assets/no-image.png';
import axiosInstance from '../../helpers/axiosInstance';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import Modal from 'react-modal';

const Image = React.memo(function Image({ src }) {
  return (
    <img
      src={src}
      className="user-box__left__picture"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = Default;
      }}
    />
  );
});

Modal.setAppElement('#root');
const UserBox = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const closeModal = () => {
    setModalOpen(false);
  };

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      maxHeight: '90%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: '1px solid #eee',
      maxWidth: '90%',
      minWidth: isMobile ? '90%' : '48%',
      wordBreak: 'break-all',
      boxShadow:
        'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    },
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      zIndex: '1001',
    },
  };

  return (
    <div className="user-box">
      <div className="user-box__left">
        <Image
          src={
            props.img ? 'https://pm-app-bek.herokuapp.com' + props.img : Default
          }
        />

        <div className="user-box__left__desc">
          <div>{props.name}</div>
          <div>{props.role}</div>
        </div>
      </div>
      <div className="user-box__right">
        <span
          className="user-box__right__more"
          onClick={() => setModalOpen(true)}
        >
          <BsBoxArrowUpRight />
        </span>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => props.toggleApprove(props.id, props.confirmed)}
        >
          {props.confirmed ? 'Unapprove' : 'Approve'}
        </div>

        <div
          onClick={() => {
            props.toggleModal();
            props.setId(props.userId);
            props.setProfileId(props.id);
          }}
        >
          <i
            style={{ color: '#8D0000', cursor: 'pointer' }}
            className="fas fa-trash-alt"
          ></i>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="user-modal">
          <div className="user-modal__close" onClick={closeModal}>
            <i class="fas fa-times"></i>
          </div>
          <img
            src={
              props.img
                ? 'https://pm-app-bek.herokuapp.com' + props.img
                : Default
            }
            className="user-modal__image"
          />
          <h2
            style={{
              alignSelf: 'center',
              marginTop: '14px',
              marginBottom: '10px',
            }}
          >
            {props.name}
          </h2>
          <div className="user-modal__info">
            Email: <span>{props.email}</span>
          </div>
          <div className="user-modal__info">
            Role: <span>{props.role}</span>
          </div>
          {props.role === 'project_manager' || props.role === 'employee' ? (
            <div className="user-modal__projects">
              <div className="user-modal__projects__title">
                {props.role === 'project_manager'
                  ? 'Projects Managing'
                  : props.role === 'employee'
                  ? 'Projects Assigned'
                  : null}
              </div>
              <div className="user-modal__projects__list">
                {props.projects?.map((project) => (
                  <div key={project.id}>{project.attributes.name}</div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="user-modal__action-buttons">
            <div
              onClick={() => {
                props.toggleModal();
                props.setId(props.userId);
                props.setProfileId(props.id);
              }}
            >
              <i
                style={{ color: '#8D0000', cursor: 'pointer' }}
                className="fas fa-trash-alt"
              ></i>
            </div>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => props.toggleApprove(props.id, props.confirmed)}
            >
              {props.confirmed ? 'Unapprove' : 'Approve'}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserBox;
