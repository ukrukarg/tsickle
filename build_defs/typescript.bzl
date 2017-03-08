def _ts_declaration_impl(ctx):
  return struct()

ts_declaration = rule(
  implementation = _ts_declaration_impl,
  attrs = {
    "srcs": attr.label_list(allow_files = True),
  }
)