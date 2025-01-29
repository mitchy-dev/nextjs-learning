#!/bin/bash

# Base directory for styles
mkdir -p src/styles/{foundation,layout,object/{component,project,utility}}

# Create main style.scss
cat > src/styles/style.scss << 'EOL'
// Foundation
@import "foundation/reset";
@import "foundation/base";

// Layout
@import "layout/main";

// Object
// Component
@import "object/component/button";
@import "object/component/input";
@import "object/component/icon";

// Project
@import "object/project/main-title";
@import "object/project/form";
@import "object/project/search-box";
@import "object/project/todo-list";

// Utility
@import "object/utility/state";
@import "object/utility/visibility";
@import "object/utility/error";
@import "object/utility/layout";
EOL

# Foundation layer
cat > src/styles/foundation/_reset.scss << 'EOL'
html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}
EOL

cat > src/styles/foundation/_base.scss << 'EOL'
body {
  background: #f6f5f4;
  color: #333333;
}
EOL

# Layout layer
cat > src/styles/layout/_main.scss << 'EOL'
.l-main {
  width: 400px;
  margin: 100px auto;
}
EOL

# Object layer - Component
cat > src/styles/object/component/_button.scss << 'EOL'
.c-button {
  padding: 5px 30px;
  background: #000;
  color: #ffffff;
  border: none;
  text-align: right;
  margin: 0;
  font-size: 16px;

  &:hover {
    cursor: pointer;
  }
}

.c-icon-button {
  padding: 0;
  border: none;
  margin: 0;
  background: transparent;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #0066ff;
    outline-offset: 2px;
    border-radius: 4px;
  }
}
EOL

cat > src/styles/object/component/_input.scss << 'EOL'
.c-input {
  padding: 5px;
  height: 40px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e8e8e8;
}

.c-edit-input {
  width: 80%;
  height: 100%;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
}
EOL

cat > src/styles/object/component/_icon.scss << 'EOL'
.c-icon {
  &--check {
    font-size: 25px !important;
    color: rgba(89, 158, 175, 0.29);
    vertical-align: middle;
  }

  &--trash {
    stroke-width: 2px;
    width: 24px;
    height: 24px;
    color: rgba(175, 47, 47, 0.47);
    vertical-align: middle;
  }

  &--square,
  &--check {
    margin-right: 15px;
    vertical-align: middle;
  }

  &:hover {
    transform: scale(1.2);
    transition: .5s transform;
  }
}
EOL

# Object layer - Project
cat > src/styles/object/project/_main-title.scss << 'EOL'
.p-main-title {
  text-align: center;
  font-size: 3em;
  color: rgba(175, 47, 47, 0.15);
}
EOL

cat > src/styles/object/project/_form.scss << 'EOL'
.p-form {
  text-align: right;
  margin-bottom: 30px;

  &__input-area {
    margin-bottom: 15px;
  }
}
EOL

cat > src/styles/object/project/_search-box.scss << 'EOL'
.p-search-box {
  width: 100%;
  height: 40px;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  margin-bottom: 15px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;

  &__icon {
    stroke-width: 2px;
    width: 24px;
    height: 24px;
    font-size: 18px;
    margin-right: 5px;
    color: #888;
  }

  &__input {
    width: calc(100% - 30px);
    height: 100%;
    border: none;
    box-sizing: border-box;
    padding: 5px 10px;
    font-size: 16px;
  }
}
EOL

cat > src/styles/object/project/_todo-list.scss << 'EOL'
.p-todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0,0,0, 0.2), 0 25px 50px 0 rgba(0,0,0, 0.1);

  &__item {
    overflow: hidden;
    padding: 15px 15px;
    background: #ffffff;
    border-bottom: 1px solid #e8e8e8;
    transition: .5s transform;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      transform: scale(1.02);
      transition: .5s transform;
    }
  }
}
EOL

# Object layer - Utility
cat > src/styles/object/utility/_state.scss << 'EOL'
.is-done {
  background: #e5e5e5;
  color: #888888;
}
EOL

cat > src/styles/object/utility/_visibility.scss << 'EOL'
.u-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
EOL

cat > src/styles/object/utility/_error.scss << 'EOL'
.u-error {
  color: #E9573E;
}
EOL

cat > src/styles/object/utility/_layout.scss << 'EOL'
.u-icon-button--trash {
  float: right;
}
EOL

# Create types definition for SCSS modules
mkdir -p src/types
cat > src/types/scss.d.ts << 'EOL'
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
EOL

echo "FLOCSS directory structure and files have been created successfully!"