import { createElement } from 'preact';
import propTypes from 'prop-types';

import { isThirdPartyUser, username } from '../util/account-id';
import { withServices } from '../util/service-context';

/**
 * Display information about an annotation's user. Link to the user's
 * activity if it is a first-party user or `settings.usernameUrl` is present.
 */
function AnnotationUser({ annotation, features, serviceUrl, settings }) {
  const user = annotation.user;
  const isFirstPartyUser = !isThirdPartyUser(user, settings.authDomain);
  const username_ = username(user);

  // How should the user's name be displayed?
  const displayName = (() => {
    if (isFirstPartyUser && !features.flagEnabled('client_display_names')) {
      return username_;
    }
    if (annotation.user_info && annotation.user_info.display_name) {
      return annotation.user_info.display_name;
    }
    return username_;
  })();

  const shouldLinkToActivity = isFirstPartyUser || settings.usernameUrl;

  if (shouldLinkToActivity) {
    return (
      <div className="annotation-user">
        <a
          className="annotation-user__link"
          href={
            isFirstPartyUser
              ? serviceUrl('user', { user })
              : `${settings.usernameUrl}${username_}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="annotation-user__user-name">{displayName}</h3>
        </a>
      </div>
    );
  }

  return (
    <div className="annotation-user">
      <h3 className="annotation-user__user-name">{displayName}</h3>
    </div>
  );
}

AnnotationUser.propTypes = {
  /** The annotation whose user is relevant */
  annotation: propTypes.object.isRequired,

  /** services */
  features: propTypes.object.isRequired,
  serviceUrl: propTypes.func.isRequired,
  settings: propTypes.object.isRequired,
};

AnnotationUser.injectedProps = ['features', 'serviceUrl', 'settings'];
export default withServices(AnnotationUser);
