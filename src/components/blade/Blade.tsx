import React from 'react';
import { Drawer } from 'antd';
import 'antd/lib/drawer/style/index.css';
import './Blade.scss';

const Blade = ({title, visible, onClose, placement, children}: any) => {

    return (
      <>
        <Drawer
          title={title}
          className={`blade-class blade-placement-${placement}`}
          placement={placement}
          closable={true}
          onClose={onClose}
          visible={visible}
          key={title}
          width='60%'
          headerStyle={{
            border: 'none'
          }}
          bodyStyle={{
           
            }}
        >
          {children}
        </Drawer>
      </>
    );
  }


export default Blade;