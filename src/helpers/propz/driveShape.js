import PropTypes from 'prop-types';

const driveCardShape = PropTypes.shape({
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { driveCardShape };
