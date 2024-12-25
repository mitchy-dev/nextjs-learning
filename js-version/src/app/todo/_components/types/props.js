import PropTypes from "prop-types";
export const todoItemPropTypes   = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.string.isRequired,
    ]),
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
  }),
  onToggleDone: PropTypes.func.isRequired,
  onShowEdit: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}