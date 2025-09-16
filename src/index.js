import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const mcp = new McpServer({ name: "mcp-arithmetic-server-js", version: "0.1.0" });

mcp.tool(
	"add",
	"Add two numbers and return the sum.",
	{ a: z.coerce.number().describe("First addend"), b: z.coerce.number().describe("Second addend") },
	async ({ a, b }) => ({ content: [{ type: "text", text: String(a + b) }] })
);

mcp.tool(
	"subtract",
	"Subtract b from a and return the difference (a - b).",
	{ a: z.coerce.number().describe("Minuend"), b: z.coerce.number().describe("Subtrahend") },
	async ({ a, b }) => ({ content: [{ type: "text", text: String(a - b) }] })
);

mcp.tool(
	"multiply",
	"Multiply two numbers and return the product.",
	{ a: z.coerce.number().describe("First factor"), b: z.coerce.number().describe("Second factor") },
	async ({ a, b }) => ({ content: [{ type: "text", text: String(a * b) }] })
);

mcp.tool(
	"divide",
	"Divide a by b and return the quotient.",
	{ a: z.coerce.number().describe("Dividend"), b: z.coerce.number().describe("Divisor") },
	async ({ a, b }) => {
		if (b === 0) {
			return { content: [{ type: "text", text: "Error: Division by zero" }], isError: true };
		}
		return { content: [{ type: "text", text: String(a / b) }] };
	}
);

mcp.tool(
	"power",
	"Raise a to the power of b (a^b).",
	{ a: z.coerce.number().describe("Base"), b: z.coerce.number().describe("Exponent") },
	async ({ a, b }) => ({ content: [{ type: "text", text: String(Math.pow(a, b)) }] })
);

mcp.tool(
	"modulus",
	"Compute a modulo b (remainder).",
	{ a: z.coerce.number().describe("Dividend"), b: z.coerce.number().describe("Divisor") },
	async ({ a, b }) => {
		if (b === 0) {
			return { content: [{ type: "text", text: "Error: Modulo by zero" }], isError: true };
		}
		return { content: [{ type: "text", text: String(a % b) }] };
	}
);

const transport = new StdioServerTransport();
await mcp.connect(transport);
console.error("mcp-arithmetic-server-js: started and listening on stdio");


