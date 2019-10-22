import React, { useState, useEffect, useRef } from 'react';
import './Details.scss';
import { Collapse } from 'reactstrap';
import { loadModules } from 'esri-loader';


export default props => {
  console.log('Details', props);

  const [ collapsed, setCollapsed ] = useState(true);
  const containerRef = useRef();
  const [ title, setTitle ] = useState();

  const toggle = () => setCollapsed(!collapsed);

  useEffect(() => {
    let feature;
    const buildContent = async () => {
      const [ Feature, watchUtils ] = await loadModules(['esri/widgets/Feature', 'esri/core/watchUtils']);

      feature = new Feature({
        container: document.createElement('div'),
        graphic: props.graphic,
        visibleElements: {
          title: false
        },
        defaultPopupTemplateEnabled: true
      });

      await watchUtils.once(feature, 'title');

      setTitle(feature.title);

      containerRef.current.appendChild(feature.container);
    };

    if (props.graphic) {
      buildContent();
    }

    return () => {
      if (feature) {
        feature.destroy();
        console.log('destroyed');
      }
    };
  }, [props.graphic]);

  return (
    <div className="details">
      <div className="title" onClick={toggle}>{title}</div>
      <Collapse isOpen={!collapsed}>
        <div ref={containerRef}></div>
      </Collapse>
    </div>
  );
};
