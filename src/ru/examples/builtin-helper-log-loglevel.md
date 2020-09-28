---
layout: InteractivePlaygroundLayout
example:
  template: |
    {{log "debug logging" level="debug"}}
    {{log "info logging" level="info"}}
    {{log "info logging is the default"}}
    {{log "logging a warning" level="warn"}}
    {{log "logging an error" level="error"}}
  preparationScript: |-
    Handlebars.logger.level = 'error'
    console.log('Current log level: ', Handlebars.logger.level, '\n---')
  input:
---

Нажмите F12 и откройте консоль разработчика, чтобы увидеть вывод журнала.  
Чтобы увидеть выходные данные отладки, требоуется правильно настроить dev-tools.
