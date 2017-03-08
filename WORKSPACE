# https://bazel.build/versions/master/docs/be/functions.html#workspace
workspace(name = "npm_tsickle")

# We could install a fixed version of node hermetically:
# https://github.com/pubref/rules_node
# Instead we just point to the locally-installed nodejs. This has the advantage
# of being the same version that was used for npm/yarn install.

load("//build_defs:nodejs_workspace.bzl", "nodejs_workspace")

# Note: when changing node version (eg. with `nvm`) you must bazel clean --expunge
nodejs_workspace(
    name = "npm",
    package_json = "//:package.json",
)
