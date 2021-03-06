import classnames from 'classnames';
import propTypes from 'prop-types';
import { createElement } from 'preact';

import SvgIcon from '../../shared/components/svg-icon';

/**
 * @param {Object} props
 *  @param {import("preact/hooks").Ref<HTMLButtonElement>} [props.buttonRef]
 *  @param {boolean} [props.expanded]
 *  @param {string} [props.extraClasses]
 *  @param {string} props.label
 *  @param {string} props.icon
 *  @param {() => any} props.onClick
 *  @param {boolean} [props.selected]
 */
function ToolbarButton({
  buttonRef,
  expanded,
  extraClasses,
  label,
  icon,
  onClick,
  selected = false,
}) {
  const handleClick = event => {
    // Stop event from propagating up to the document and being treated as a
    // click on document content, causing the sidebar to close.
    event.stopPropagation();
    onClick();
  };

  return (
    <button
      className={classnames('annotator-frame-button', extraClasses)}
      aria-label={label}
      aria-expanded={expanded}
      aria-pressed={selected}
      onClick={handleClick}
      ref={buttonRef}
      title={label}
    >
      <SvgIcon name={icon} />
    </button>
  );
}

ToolbarButton.propTypes = {
  buttonRef: propTypes.any,
  expanded: propTypes.bool,
  extraClasses: propTypes.string,
  label: propTypes.string.isRequired,
  icon: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  selected: propTypes.bool,
};

/**
 * @typedef ToolbarProps
 *
 * @prop {() => any} closeSidebar -
 *   Callback for the "Close sidebar" button. This button is only shown when
 *   `useMinimalControls` is true and the sidebar is open.
 * @prop {() => any} createAnnotation -
 *   Callback for the "Create annotation" / "Create page note" button. The type
 *   of annotation depends on whether there is a text selection and is decided
 *   by the caller.
 * @prop {boolean} isSidebarOpen - Is the sidebar currently visible?
 * @prop {'annotation'|'note'} newAnnotationType -
 *   Icon to show on the "Create annotation" button indicating what kind of annotation
 *   will be created.
 * @prop {boolean} showHighlights - Are highlights currently visible in the document?
 * @prop {() => any} toggleHighlights -
 *   Callback to toggle visibility of highlights in the document.
 * @prop {() => any} toggleSidebar -
 *   Callback to toggle the visibility of the sidebar.
 * @prop {import("preact/hooks").Ref<HTMLButtonElement>} [toggleSidebarRef] -
 *   Ref that gets set to the toolbar button for toggling the sidebar.
 *   This is exposed to enable the drag-to-resize functionality of this
 *   button.
 * @prop {boolean} [useMinimalControls] -
 *   If true, all controls are hidden except for the "Close sidebar" button
 *   when the sidebar is open.
 * @prop {boolean} [transparentButtons] -
 *   If true, all control buttons are rendered transparent.
 */

/**
 * Controls on the edge of the sidebar for opening/closing the sidebar,
 * controlling highlight visibility and creating new page notes.
 *
 * @param {ToolbarProps} props
 */
export default function Toolbar({
  closeSidebar,
  createAnnotation,
  isSidebarOpen,
  newAnnotationType,
  showHighlights,
  toggleHighlights,
  toggleSidebar,
  toggleSidebarRef,
  useMinimalControls = false,
  transparentButtons = false,
}) {
  return (
    <div>
      {useMinimalControls && isSidebarOpen && (
        <ToolbarButton
          extraClasses={"annotator-frame-button--sidebar_close"
            + (transparentButtons ? " annotator-frame-button--transparent" : "")
          }
          label="Close annotation sidebar"
          icon="cancel"
          onClick={closeSidebar}
        />
      )}
      {!useMinimalControls && (
        <ToolbarButton
          extraClasses={"annotator-frame-button--sidebar_toggle"
            + (transparentButtons ? " annotator-frame-button--transparent" : "")
          }
          buttonRef={toggleSidebarRef}
          label="Annotation sidebar"
          icon={isSidebarOpen ? 'caret-right' : 'caret-left'}
          expanded={isSidebarOpen}
          onClick={toggleSidebar}
        />
      )}
      {!useMinimalControls && (
        <ToolbarButton
          extraClasses={transparentButtons ? "annotator-frame-button--transparent" : ""}
          label="Show highlights"
          icon={showHighlights ? 'show' : 'hide'}
          selected={showHighlights}
          onClick={toggleHighlights}
        />
      )}
      {!useMinimalControls && (
        <ToolbarButton
          extraClasses={transparentButtons ? "annotator-frame-button--transparent" : ""}
          label={
            newAnnotationType === 'note' ? 'New page note' : 'New annotation'
          }
          icon={newAnnotationType === 'note' ? 'note' : 'annotate'}
          onClick={createAnnotation}
        />
      )}
    </div>
  );
}

Toolbar.propTypes = {
  closeSidebar: propTypes.func.isRequired,
  createAnnotation: propTypes.func.isRequired,
  isSidebarOpen: propTypes.bool.isRequired,
  newAnnotationType: propTypes.oneOf(['annotation', 'note']).isRequired,
  showHighlights: propTypes.bool.isRequired,
  toggleHighlights: propTypes.func.isRequired,
  toggleSidebar: propTypes.func.isRequired,
  toggleSidebarRef: propTypes.any,
  useMinimalControls: propTypes.bool,
  transparentButtons: propTypes.bool,
};
