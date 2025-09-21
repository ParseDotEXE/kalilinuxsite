import { Prompt } from "../types";

export const MOTD = `Welcome to Parsa Rahimnia's portfolio site!

GitHub:  &nbsp;&nbsp;<a href="https://github.com/ParseDotEXE" target="_blank" rel="noopener noreferrer">https://github.com/ParseDotEXE</a>
LinkedIn: <a href="https://www.linkedin.com/in/parsa-rahimnia/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/parsa-rahimnia/</a>

Hello, I'm <b>Parsa Rahimnia</b>. I am a <b>Computer Science student at McGill University</b> aspiring to specialize in back-end development.

Type 'help' to see the available commands.`.replace(/\n/g, "<br/>");

const KALI_LOGO = `
    <span class="text-kali-blue flex flex-col">
      <span>${"..............".replace(/ /g, "&nbsp;")}</span>
      <span>${"            ..,;:ccc,.".replace(/ /g, "&nbsp;")}</span>
      <span>${"          ......''';lxO.".replace(/ /g, "&nbsp;")}</span>
      <span>${".....''''..........,:ld;".replace(/ /g, "&nbsp;")}</span>
      <span>${"           .';;;:::;,,.x,".replace(/ /g, "&nbsp;")}</span>
      <span>${"      ..'''.            0Xxoc:,.  ...".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${"  ....                ,ONkc;,;cokOdc',.".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${" .                   OMo           ':ddo.".replace(
        / /g,
        "&nbsp;"
      )}</span>

      <span>${"                    dMc               :OO;".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${"                    0M.                 .:o.".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${"                    ;Wd".replace(/ /g, "&nbsp;")}</span>
      <span>${"                     ;XO,".replace(/ /g, "&nbsp;")}</span>
      <span>${"                       ,d0Odlc;,..".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${"                            ..',;:cdOOd::,.".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${"                                     .:d;.':;.".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${"                                        'd,  .'".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${"                                          ;l   ..".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${"                                           .o".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${"                                             c".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${"                                             .'".replace(
        / /g,
        "&nbsp;"
      )}</span>
      <span>${"                                              .".replace(
        / /g,
        "&nbsp;"
      )}</span>
    </span>
  `;

const COMMANDS: Record<
  string,
  (username: string, args: string[]) => string
> = {
  whoami: (username) => username,
  motd: () => MOTD,
  photography: () => openLink("https://shorturl.at/WXNA0"),
  date: () => new Date().toLocaleDateString(),
  github: () => openLink("https://github.com/ParseDotEXE"),
  resume: () => openLink("https://drive.google.com/file/d/19uIrd-ivEBy49pGn6lth-UYH1ht7bbc-/view?usp=sharing"),
  projects: () => openLink("https://github.com/ParseDotEXE?tab=repositories"),
  linkedin: () => openLink("https://www.linkedin.com/in/parsa-rahimnia/"),
  email: () => openLink("mailto:parsarahimnia@gmail.com"),
  dog: () =>
    `Here's a cute dog for you! 🐶<br/><br/>${openLink("https://drive.google.com/file/d/1houSCPa58YGSwa91MvN9uMpEnHQumcUP/view?usp=sharing")}`,
  kali: () => KALI_LOGO,
  about: (username) => `Hello, ${username}!

    My name is Parsa and I'm 21 years old. I'm originally from <b>Tehran, Iran</b>, currently residing in <b>Montreal, Canada</b>. I'm into applied and theoretical <b>Computer Science</b> and <b>Cognitive Science</b>. 
    
    I also love hiking, playing video games, lifting, and pretending to be a photographer with my iPhone (check out the gallery).
    
    I like <b>building scalable web application</b>, I am a <b>Computer Science student at McGill University</b> aspiring to specialize in <b>back-end development</b>. I have a passion for <b>designing and implementing robust back-end systems</b> that power impactful technological solutions.
    
    My focus on delivering high-quality applications is fueled by a genuine interest in leading technologies, particularly <b>Java</b>, <b>C</b>, and <b>Python</b>.`,
  echo: (_, args) => args.join("&nbsp;"),
};

export const COMMAND_NAMES = [...Object.keys(COMMANDS), "clear", "help"].sort(
  (a, z) => a.localeCompare(z)
);

export function getCommandResponse(
  { command, sudo, args }: Prompt,
  username: string
) {
  if (sudo && !command) return "Usage: sudo [command] [args]";
  if (!command) return "";

  if (command in COMMANDS) {
    let result = COMMANDS[command](username, args);
    if (command !== "kali") {
      result = result.replace(/\n/g, "<br/>");
    }

    return result;
  }

  if (command === "help") {
    return `Usage: [command] [options] 
    
      ${COMMAND_NAMES.join(", ")}`.replace(/\n/g, "<br/>");
  }

  return `${command}: command not found`;
}

function openLink(url: string) {
  setTimeout(() => window.open(url, "_blank")?.focus(), 1000);
  return `Redirecting to <a href="" target="_blank" rel="noreferrer noopener">${url}</a>...`;
}