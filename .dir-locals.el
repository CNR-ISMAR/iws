(
 (python-mode
  (python-shell-interpreter . "python")
  (python-shell-interpreter-args . "/opt/iws/manage.py shell_plus")
  (python-shell-prompt-regexp . "In \\[[0-9]+\\]: ")
  (python-shell-prompt-output-regexp . "Out\\[[0-9]+\\]: ")
  (python-shell-completion-setup-code . "from IPython.core.completerlib import module_completion")
  (python-shell-completion-module-string-code . "';'.join(module_completion('''%s'''))\n")
  (python-shell-completion-string-code . "';'.join(get_ipython().Completer.all_completions('''%s'''))\n")
  (python-shell-virtualenv-path . "/opt/VirtEnv/istorm_geonode/")
  ;;(python-shell-completion-native-disabled-interpreters . "python")
  )
  )
