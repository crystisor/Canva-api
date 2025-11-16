from fastmcp import FastMCP

# Create a server instance
mcp = FastMCP(name="MyAssistantServer")

@mcp.tool
def multiply(a: float, b: float) -> float:
    """Multiplies two numbers."""
    return a * b

@mcp.resource("config://version")
def get_version(): 
    return "2.0.1"

@mcp.resource("users://{user_id}/profile")
def get_profile(user_id: int):
    # Fetch profile for user_id...
    return {"name": f"User {user_id}", "status": "active"}

mcp.run()