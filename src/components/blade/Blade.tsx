import React, { useState } from 'react';
import { Drawer } from 'antd';
import 'antd/lib/drawer/style/index.css';
import './Blade.scss';

const Blade = ({title, visible, onClose, children}: any) => {
    const [state] = useState({ placement: 'bottom' } as any);


    return (
      <>
        <Drawer
          title={title}
          className="blade-class"
          placement={state.placement}
          closable={true}
          onClose={onClose}
          visible={visible}
          key={title}
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