import { useEffect, useRef, useState } from 'react';
import { Collapse } from 'reactstrap';
import esriModules from '../../esriModules';
import './Details.scss';

export default (props) => {
  console.log('Details', props);

  const [collapsed, setCollapsed] = useState(true);
  const containerRef = useRef();
  const [title, setTitle] = useState();

  const toggle = () => setCollapsed(!collapsed);

  useEffect(() => {
    let feature;
    const buildContent = async () => {
      const { Feature, watchUtils } = await esriModules();

      feature = new Feature({
        container: document.createElement('div'),
        graphic: props.graphic,
        visibleElements: {
          title: false,
        },
        defaultPopupTemplateEnabled: true,
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
    <div
      className="details"
      onMouseEnter={() => props.highlightGraphic(props.graphic)}
      onMouseLeave={() => props.highlightGraphic()}
    >
      <div className="title" onClick={toggle}>
        {title}
      </div>
      <Collapse isOpen={!collapsed}>
        <div ref={containerRef}></div>
      </Collapse>
    </div>
  );
};
