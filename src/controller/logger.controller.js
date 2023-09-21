export const getLogs = (req, res)=> {
    req.logger.fatal(`FATAL => ${new Date()} - LoggerType: fatal`)
    req.logger.error(`ERROR => ${new Date()} - LoggerType: error`)
    req.logger.warning(`WARNING => ${new Date()} - LoggerType: warning`)
    req.logger.info(`INFO => ${new Date()} - LoggerType: info`)
    req.logger.http(`HTTP => ${new Date()} - LoggerType: http`)
    req.logger.debug(`DEBUG => ${new Date()} - LoggerType: debug`)
    res.send({state: 'Alert test'})
  }