export class SkaffoldPreview {
	private _result: string

	constructor(
		private _currentPath: string,
		private _profile?: string,
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

	get profile(): string | undefined {
		return this._profile
	}
}
