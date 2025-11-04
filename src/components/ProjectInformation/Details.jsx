import { once } from '@arcgis/core/core/reactiveUtils';
import Feature from '@arcgis/core/widgets/Feature';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Collapse } from 'reactstrap';
import './Details.scss';

export default function Details({ graphic, highlightGraphic }) {
  const [collapsed, setCollapsed] = useState(true);
  const containerRef = useRef();
  const [title, setTitle] = useState();

  const toggle = () => setCollapsed(!collapsed);

  useEffect(() => {
    let feature;
    const buildContent = async () => {
      feature = new Feature({
        container: document.createElement('div'),
        graphic,

        // required for arcade expressions in popup template
        spatialReference: graphic.mapView.spatialReference,
        map: graphic.mapView.map,

        visibleElements: {
          title: false,
        },
        defaultPopupTemplateEnabled: true,
      });

      await once(() => feature.title);

      setTitle(feature.title);

      containerRef.current.appendChild(feature.container);
    };

    if (graphic) {
      buildContent();
    }

    return () => {
      if (feature) {
        feature.destroy();
        console.log('destroyed');
      }
    };
  }, [graphic]);

  return (
    <div
      className="details"
      onMouseEnter={() => highlightGraphic(graphic)}
      onMouseLeave={() => highlightGraphic()}
    >
      <button className="title" onClick={toggle}>
        {title}
      </button>
      <Collapse isOpen={!collapsed}>
        <div ref={containerRef}></div>
      </Collapse>
    </div>
  );
}
Details.propTypes = {
  graphic: PropTypes.object,
  highlightGraphic: PropTypes.func,
};
