#!/usr/bin/env node

import * as yargs from 'yargs'
import { tagCommand, tagOptions } from './commands/tag'
import { tagTarbalUrlCommand, tagTarbalUrlOptions } from './commands/tag-tarbal-url'

const argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command('tag', 'Get the latest tag from a repository', function (yargs) {
      return yargs.options(tagOptions()).usage('Usage: $0 <user> <repo>')
    }, tagCommand)
    .command('tag-tarbal-url', 'Determine Github tarbal URL from tag name', function (yargs) {
      return yargs.options(tagTarbalUrlOptions()).usage('Usage $0 <user> <repo> <tagName>')
    }, tagTarbalUrlCommand)
    .help('h')
    .alias('h', 'help')
    .argv
