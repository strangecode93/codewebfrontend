/* eslint-disable react-hooks/exhaustive-deps */
import { Maximize, Sun } from "lucide-react";
import EditorNavbar from "../components/EditorNavbar";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { api_base_url } from "../helper";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Editior = () => {
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello</h1>");
  const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [jsCode, setJsCode] = useState("// some comment");

  let { projectID } = useParams();

  // Function to change the theme
  const changeTheme = () => {
    if (isLightMode) {
      document.querySelector(".EditorNavbar").style.backgroundColor = "#141414";
      document.body.classList.remove("lightMode");
    } else {
      document.querySelector(".EditorNavbar").style.backgroundColor = "#fff";
      document.body.classList.add("lightMode");
    }
    setIsLightMode(!isLightMode);
  };

  // Function to update the iframe content
  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById("iframe");
    if(iframe)iframe.srcdoc = html + css + js;
  };

  // Update iframe on initial load and whenever the code changes
  useEffect(() => {
    run();
  }, [htmlCode, cssCode, jsCode]);

  // Fetch the project data when the component mounts
  useEffect(() => {
    // Ensure that api_base_url and projectID are correctly defined
    const userId = localStorage.getItem("userId");
    
    if (!userId || !projectID) {
      toast.error("Missing userId or projectID");
      return;
    }
  
    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projectId: projectID,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Check if the project data is available
        if (data.success) {
          setHtmlCode(data.project.htmlCode);
          setCssCode(data.project.cssCode);
          setJsCode(data.project.jsCode);
          toast.success(data.message);
        } else {
          // If no project is found or the response is unsuccessful
          toast.error("Project not found");
        }
      })
      .catch((err) => {
        // Catch any errors from the fetch or promise rejection
        console.error("Error fetching project data:", err);
        toast.error("An error occurred while fetching the project");
      });
  }, [projectID]); // Ensure projectID is included in dependencies
  
  

  // Update the project when Ctrl+S is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();

        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projectId: projectID,
            htmlCode: htmlCode,
            cssCode: cssCode,
            jsCode: jsCode,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          })
          .catch((err) => {
            toast.error("Error updating project");
            console.error("Error updating project:", err);
          });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [htmlCode, cssCode, jsCode, projectID]); // Re-run when code or projectID changes

  return (
    <div>
      <EditorNavbar projectID={projectID} />
      <div className="flex">
        {/* Editor Section */}
        <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
          <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
            <div className="tabs flex items-center gap-2">
              <div
                onClick={() => setTab("html")}
                className={`tab cursor-pointer rounded-md p-[6px] px-[10px] text-[15px] ${
                  tab === "html" ? "bg-blue-500" : "bg-[#1E1E1E]"
                }`}
              >
                HTML
              </div>
              <div
                onClick={() => setTab("css")}
                className={`tab cursor-pointer rounded-md p-[6px] px-[10px] text-[15px] ${
                  tab === "css" ? "bg-blue-500" : "bg-[#1E1E1E]"
                }`}
              >
                CSS
              </div>
              <div
                onClick={() => setTab("js")}
                className={`tab cursor-pointer rounded-md p-[6px] px-[10px] text-[15px] ${
                  tab === "js" ? "bg-blue-500" : "bg-[#1E1E1E]"
                }`}
              >
                JavaScript
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="cursor-pointer" onClick={changeTheme}>
                <Sun />
              </div>
              <div className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <Maximize />
              </div>
            </div>
          </div>

          {/* Conditional Rendering for the Editors */}
          {tab === "html" && (
            <Editor
              onChange={(value) => {
                setHtmlCode(value);
                run();
              }}
              height="84vh"
              theme={isLightMode ? "vs" : "vs-dark"}
              language="html"
              value={htmlCode}
            />
          )}
          {tab === "css" && (
            <Editor
              onChange={(value) => {
                setCssCode(value);
                run();
              }}
              height="84vh"
              theme={isLightMode ? "vs" : "vs-dark"}
              language="css"
              value={cssCode}
            />
          )}
          {tab === "js" && (
            <Editor
              onChange={(value) => {
                setJsCode(value);
                run();
              }}
              height="84vh"
              theme={isLightMode ? "vs" : "vs-dark"}
              language="javascript"
              value={jsCode}
            />
          )}
        </div>

        {/* Iframe Section */}
        {!isExpanded && (
          <iframe
            id="iframe"
            className="w-1/2 min-h-[82vh] bg-white"
            title="Output"
          />
        )}
      </div>
    </div>
  );
};

export default Editior;
