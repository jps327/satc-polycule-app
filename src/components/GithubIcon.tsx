import { ReactComponent as GithubSVGIcon } from '../assets/github-icon.svg';

export default function GithubIcon(): JSX.Element {
  return (
    <a
      href="https://github.com/jps327/satc-polycule-app"
      className="z-50 fixed bottom-2 left-2 sm:relative group flex 0 hover:bg-gray-100 hover:text-blue-900 transition-colors p-1.5 sm:py-2 sm:px-3 sm:rounded bg-gray-700 text-white sm:bg-white sm:text-inherit w-fit rounded-full"
      target="_blank"
      rel="noreferrer noopener"
    >
      <span className="hidden sm:block sm:mr-2">Browse on GitHub</span>
      <GithubSVGIcon className="w-5 h-5 sm:w-6 sm:h-6 sm:fill-[#24292f] transition-colors group-hover:fill-blue-900 fill-white" />
    </a>
  );
}
