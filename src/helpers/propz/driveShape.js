import PropTypes from 'prop-types';

const driveCardShape = PropTypes.shape({
  date: PropTypes.string.isRequired,
  startingTime: PropTypes.string.isRequired,
  endingTime: PropTypes.string.isRequired,
  origination: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { driveCardShape };
