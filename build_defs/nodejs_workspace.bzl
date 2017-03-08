
def _nodejs_workspace_impl(ctx):
  """
  Workspace rule that pulls in the node binary. The binary will be available as
  //:nodejs_bin in the workspace.
  Args:
    binary: The name of the node executable in path.
  """
  # https://www.bazel.build/versions/master/docs/skylark/lib/repository_ctx.html#which
  node = ctx.which(ctx.attr.binary)

  if node == None:
    fail("Node.js not found in path.")

  # https://www.bazel.build/versions/master/docs/skylark/lib/repository_ctx.html#symlink
  ctx.symlink(node, "nodejs_bin")

  ctx.file("BUILD", """
package(default_visibility=["//visibility:public"])
alias(
    name = "node",
    actual = "//:nodejs_bin",
)
""", False)   
  ctx.template("typescript.bzl", Label("//build_defs:typescript.bzl"))
  ctx.template("generate_build_file.js",  Label("//build_defs:generate_build_file.js"))

  result = ctx.execute(["./generate_build_file.js", ctx.path(ctx.attr.package_json)])
  if result.return_code > 0:
    print(result.stdout)
    print(result.stderr)

nodejs_workspace = repository_rule(
    _nodejs_workspace_impl,
    attrs = {
        "binary": attr.string(default="node"),
        "package_json": attr.label(),
    },
)























