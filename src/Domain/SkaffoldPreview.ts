export class SkaffoldPreview {
	private _result: string

	constructor(
		private _profile: string[],
		private _currentPath: string,
	) {
		this._result = ''
	}

	get result(): string {
		return this._result
	}

	set result(value: string) {
		this._result = value
	}

	get currentPath(): string {
		return this._currentPath
	}

	getRenderProfileOption(): string {
		return this._profile.map((p) => `-p ${p}`).join(' ')
	}
}
