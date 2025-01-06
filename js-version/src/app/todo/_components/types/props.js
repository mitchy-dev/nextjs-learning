import PropTypes from "prop-types";

export const taskShape = {
  id: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
  text: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export const taskPropType = PropTypes.shape(taskShape);
export const tasksListPropType = PropTypes.arrayOf(taskPropType).isRequired;
export const todoHandlersPropTypes = PropTypes.shape({
    onToggleDone: PropTypes.func.isRequired,
    onShowEdit: PropTypes.func.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onRemoveTask: PropTypes.func.isRequired,
    onConfirmEdit: PropTypes.func.isRequired,
});
export const todoItemPropTypes   = {
  task: taskPropType,
  handlers: todoHandlersPropTypes,
}
export const todoListPropTypes = {
  tasks: tasksListPropType,
  handlers: todoHandlersPropTypes,
}