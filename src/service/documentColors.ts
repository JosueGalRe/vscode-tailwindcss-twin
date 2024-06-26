import * as vscode from "vscode"
import {
    colorFromFunction,
    colorFromHex,
    colorFromIdentifier,
    colorFromTransparent,
    isColorFunction,
    isColorHexValue,
    isColorIdentifier,
    isColorTransparent,
    parse as parseColors,
} from "~/common/color"
import type { ExtractedToken, TextDocument } from "~/common/extractors/types"
import { defaultLogger as console } from "~/common/logger"
import * as parser from "~/common/parser"
import type { ServiceOptions } from "~/shared"
import { TailwindLoader } from "./tailwind"

export default function documentColors(
    tokens: ExtractedToken[],
    document: TextDocument,
    state: TailwindLoader,
    options: ServiceOptions,
): vscode.ProviderResult<vscode.ColorInformation[]> {
    if (tokens.length === 0) return []
    const colorInformations: vscode.ColorInformation[] = []
    const start = process.hrtime.bigint()
    doDocumentColors(tokens)
    const end = process.hrtime.bigint()
    console.trace(`documentColors (${Number((end - start) / 10n ** 6n)}ms)`)
    return colorInformations

    function doDocumentColors(tokens: ExtractedToken[]) {
        try {
            for (const token of tokens) {
                const { kind, start: offset } = token
                if (kind === "theme" || kind === "screen") continue
                const { items } = parser.spread(token.value, { separator: state.separator })
                for (const { target } of items) {
                    if (
                        (target.type === parser.NodeType.ShortCss ||
                            target.type === parser.NodeType.ArbitraryClassname) &&
                        target.expr
                    ) {
                        const expr = target.expr
                        const colorTokens = parseColors(expr.value)
                        for (const t of colorTokens) {
                            if (isColorHexValue(t)) {
                                const color = colorFromHex(expr.value.slice(...t.range))
                                colorInformations.push({
                                    color,
                                    range: new vscode.Range(
                                        document.positionAt(offset + expr.range[0] + t.range[0]),
                                        document.positionAt(offset + expr.range[0] + t.range[1]),
                                    ),
                                })
                            } else if (isColorIdentifier(t)) {
                                const color = colorFromIdentifier(expr.value, t)
                                colorInformations.push({
                                    color,
                                    range: new vscode.Range(
                                        document.positionAt(offset + expr.range[0] + t.range[0]),
                                        document.positionAt(offset + expr.range[0] + t.range[1]),
                                    ),
                                })
                            } else if (isColorTransparent(t)) {
                                const color = colorFromTransparent()
                                colorInformations.push({
                                    color,
                                    range: new vscode.Range(
                                        document.positionAt(offset + expr.range[0] + t.range[0]),
                                        document.positionAt(offset + expr.range[0] + t.range[1]),
                                    ),
                                })
                            } else if (isColorFunction(t)) {
                                const color = colorFromFunction(t)
                                if (color) {
                                    colorInformations.push({
                                        color,
                                        range: new vscode.Range(
                                            document.positionAt(offset + expr.range[0] + t.range[0]),
                                            document.positionAt(offset + expr.range[0] + t.range[1]),
                                        ),
                                    })
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error)
            console.error("do document colors failed.")
        }
    }
}
